// Show UI with a default size that can be resized
figma.showUI(__html__, { 
  width: 800,
  height: 600,
  themeColors: true
});

interface ComponentInfo {
  name: string;
  id: string;
  sourceComponentSet?: string;
  path: string;
  isRemote: boolean;
  libraryName: string;
  libraryId?: string; // This is the file key
  libraryFileUrl?: string; // URL to open the library file
  masterComponentId: string;
  masterComponentName: string;
  sourceComponentId?: string;
  originalName?: string;
}

// Cache for library information - Maps file key to library display name
const libraryCache = new Map<string, string>();
const fileKeyToName = new Map<string, string>();

// Try to get a user-friendly library name from file key
function getLibraryDisplayName(fileKey: string): string {
  // Check if we have a custom name set
  if (fileKeyToName.has(fileKey)) {
    return fileKeyToName.get(fileKey)!;
  }

  // Return a short, readable file key
  return `Library ${fileKey.substring(0, 10)}...`;
}

async function getLibraryNameFromComponent(component: ComponentNode): Promise<string> {
  try {
    // Extract file key from component key
    const componentKey = component.key;
    if (!componentKey) {
      return 'Unknown Library';
    }

    // Check cache first
    if (libraryCache.has(componentKey)) {
      return libraryCache.get(componentKey)!;
    }

    const fileKey = componentKey.split(':')[0];

    // Check if we already have a name for this file key
    if (fileKeyToName.has(fileKey)) {
      const libName = fileKeyToName.get(fileKey)!;
      libraryCache.set(componentKey, libName);
      return libName;
    }

    // Try to import the component to get more information
    if (component.remote) {
      try {
        const importedComp = await figma.importComponentByKeyAsync(componentKey);

        if (importedComp) {
          // Try to get page name
          let currentNode: BaseNode | null = importedComp;

          while (currentNode && currentNode.type !== 'PAGE') {
            currentNode = currentNode.parent;
          }

          if (currentNode && currentNode.type === 'PAGE') {
            const pageName = (currentNode as PageNode).name;

            figma.ui.postMessage({
              type: 'debug',
              message: `Imported component page name: "${pageName}" for file key ${fileKey.substring(0, 10)}`
            });

            // Use page name if it's not a default name
            if (pageName &&
                pageName !== 'Page 1' &&
                !pageName.match(/^Page \d+$/)) {
              fileKeyToName.set(fileKey, pageName);
              libraryCache.set(componentKey, pageName);
              return pageName;
            }
          }
        }
      } catch (e) {
        // Import failed, continue with fallback
      }
    }

    // Fallback: Use file key as identifier
    const displayName = getLibraryDisplayName(fileKey);
    libraryCache.set(componentKey, displayName);
    return displayName;
  } catch (error) {
    console.error('Error getting library name:', error);
    return 'Unknown Library';
  }
}

async function findForeignComponents() {
  const foreignComponents: ComponentInfo[] = [];
  const seenComponents = new Set<string>(); // Track unique components to avoid duplicates
  const componentsToResolve: { comp: ComponentInfo; mainComponent: ComponentNode }[] = [];
  let processedCount = 0;
  let totalNodes = 0;

  // First pass: count total nodes for progress tracking
  function countNodes(node: BaseNode): number {
    let count = 1;
    if ('children' in node) {
      for (const child of (node as ChildrenMixin).children) {
        count += countNodes(child);
      }
    }
    return count;
  }

  totalNodes = countNodes(figma.currentPage);
  figma.ui.postMessage({
    type: 'debug',
    message: `Starting scan of ${totalNodes} nodes...`
  });

  // Recursively search through all nodes
  function traverse(node: SceneNode | DocumentNode | PageNode, path: string = "") {
    processedCount++;
    
    // Send progress update every 50 nodes
    if (processedCount % 50 === 0) {
      const progress = Math.round((processedCount / totalNodes) * 100);
      figma.ui.postMessage({
        type: 'progress',
        progress: progress,
        message: `Scanning... ${processedCount}/${totalNodes} nodes`
      });
    }

    if (node.type === "INSTANCE") {
      const mainComponent = node.mainComponent;
      if (mainComponent && mainComponent.remote) {
        // Create a unique key for deduplication
        const uniqueKey = `${mainComponent.key}-${node.name}`;
        if (seenComponents.has(uniqueKey)) {
          return; // Skip duplicate
        }
        seenComponents.add(uniqueKey);

        const componentSet = mainComponent.parent;
        let libraryId = "";
        
        // Get file key from component key
        if (mainComponent.key) {
          const keyParts = mainComponent.key.split(':');
          if (keyParts.length >= 2) {
            libraryId = keyParts[0];
          }
        }

        const sourceComponentId = mainComponent.key ? mainComponent.key.split(':')[1] : undefined;
        
        const componentInfo: ComponentInfo = {
          name: node.name,
          id: node.id,
          sourceComponentSet: componentSet?.type === "COMPONENT_SET" ? componentSet.name : mainComponent.name,
          path: path + "/" + node.name,
          isRemote: true,
          libraryName: "Loading...",
          libraryId: libraryId,
          libraryFileUrl: libraryId ? `https://www.figma.com/file/${libraryId}/` : undefined,
          masterComponentId: mainComponent.id,
          masterComponentName: mainComponent.name,
          sourceComponentId: sourceComponentId,
          originalName: mainComponent.name
        };
        
        foreignComponents.push(componentInfo);
        componentsToResolve.push({ comp: componentInfo, mainComponent });
      }
    }
    
    // Continue traversing if the node has children
    if ("children" in node) {
      const newPath = path + "/" + node.name;
      for (const child of (node as ChildrenMixin).children) {
        traverse(child as SceneNode, newPath);
      }
    }
  }

  // Start traversing from the current page
  traverse(figma.currentPage);
  
  figma.ui.postMessage({
    type: 'debug',
    message: `Found ${foreignComponents.length} unique foreign components`
  });

  // Resolve library names for all components
  figma.ui.postMessage({
    type: 'debug',
    message: `Resolving library names for ${componentsToResolve.length} components...`
  });

  for (let i = 0; i < componentsToResolve.length; i++) {
    const { comp, mainComponent } = componentsToResolve[i];
    const libraryName = await getLibraryNameFromComponent(mainComponent);
    comp.libraryName = libraryName;
    
    // Send progress update every 5 components
    if ((i + 1) % 5 === 0 || i === componentsToResolve.length - 1) {
      const progress = Math.round(((i + 1) / componentsToResolve.length) * 100);
      figma.ui.postMessage({
        type: 'progress',
        progress: progress,
        message: `Resolving libraries... ${i + 1}/${componentsToResolve.length}`
      });
    }
  }

  figma.ui.postMessage({
    type: 'debug',
    message: `Resolved all library names`
  });

  return foreignComponents;
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg: { type: string; id?: string }) => {
  if (msg.type === 'find-components') {
    try {
      const components = await findForeignComponents();
      
      // Sort components by library name
      const sortedComponents = components.sort((a, b) => {
        const aLib = a.libraryName || 'Unknown Library';
        const bLib = b.libraryName || 'Unknown Library';
        if (aLib !== bLib) {
          return aLib.localeCompare(bLib);
        }
        return a.masterComponentName.localeCompare(b.masterComponentName);
      });
      
      figma.ui.postMessage({
        type: 'foreign-components-found',
        components: sortedComponents
      });
      
      figma.ui.postMessage({
        type: 'debug',
        message: `Scan complete! Found ${components.length} foreign components.`
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'debug',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  } else if (msg.type === 'select-component' && msg.id) {
    const node = figma.getNodeById(msg.id) as SceneNode;
    if (node) {
      figma.viewport.scrollAndZoomIntoView([node]);
      if ('selection' in figma.currentPage) {
        figma.currentPage.selection = [node];
      }
    }
  }
  
  // If the plugin command is canceled
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};