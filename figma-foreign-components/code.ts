// Show UI with a default size that can be resized
figma.showUI(__html__, { 
  width: 450,
  height: 500,
  themeColors: true
});

interface ComponentInfo {
  name: string;
  id: string;
  sourceComponentSet?: string;
  path: string;
  isRemote: boolean;
  libraryName?: string;
  masterComponentId?: string;
  masterComponentName?: string;
}

function findForeignComponents() {
  const foreignComponents: ComponentInfo[] = [];
  
  // Recursively search through all nodes in the document
  function traverse(node: SceneNode | DocumentNode | PageNode, path: string = "") {
    if (node.type === "INSTANCE") {
      const mainComponent = node.mainComponent;
      if (mainComponent) {
        // Check if the component is from another file
        const isRemote = mainComponent.remote;
        if (isRemote) {
          const componentSet = mainComponent.parent;
          // Get library name from the remote component's source file
          const libraryName = mainComponent.description ? 
            mainComponent.description.split(' from ')[1]?.split('.figma')[0] || "Unknown Library" :
            "Unknown Library";
          
          foreignComponents.push({
            name: node.name,
            id: node.id,
            sourceComponentSet: componentSet?.type === "COMPONENT_SET" ? componentSet.name : mainComponent.name,
            path: path + "/" + node.name,
            isRemote: true,
            libraryName: libraryName,
            masterComponentId: mainComponent.id,
            masterComponentName: mainComponent.name
          });
        }
      }
    }
    
    // Continue traversing if the node has children
    if ("children" in node) {
      const newPath = path + "/" + node.name;
      (node as ChildrenMixin).children.forEach(child => traverse(child as SceneNode, newPath));
    }
  }

  // Start traversing from the current page to avoid document-level issues
  traverse(figma.currentPage);
  
  // Send the results to the UI
  figma.ui.postMessage({
    type: 'foreign-components-found',
    components: foreignComponents
  });
}

// Listen for messages from the UI
figma.ui.onmessage = async (msg: { type: string; id?: string }) => {
  if (msg.type === 'find-components') {
    findForeignComponents();
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