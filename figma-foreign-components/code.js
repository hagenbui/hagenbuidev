"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Show UI with a default size that can be resized
figma.showUI(__html__, {
    width: 800,
    height: 600,
    themeColors: true
});
// Cache for library information - Maps file key to library display name
const libraryCache = new Map();
const fileKeyToName = new Map();
// Try to get a user-friendly library name from file key
function getLibraryDisplayName(fileKey) {
    // Check if we have a custom name set
    if (fileKeyToName.has(fileKey)) {
        return fileKeyToName.get(fileKey);
    }
    // Return a short, readable file key
    return `Library ${fileKey.substring(0, 10)}...`;
}
function getLibraryNameFromComponent(component) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract file key from component key
            const componentKey = component.key;
            if (!componentKey) {
                return 'Unknown Library';
            }
            // Check cache first
            if (libraryCache.has(componentKey)) {
                return libraryCache.get(componentKey);
            }
            const fileKey = componentKey.split(':')[0];
            // Check if we already have a name for this file key
            if (fileKeyToName.has(fileKey)) {
                const libName = fileKeyToName.get(fileKey);
                libraryCache.set(componentKey, libName);
                return libName;
            }
            // Try to import the component to get more information
            if (component.remote) {
                try {
                    const importedComp = yield figma.importComponentByKeyAsync(componentKey);
                    if (importedComp) {
                        // Try to get page name
                        let currentNode = importedComp;
                        while (currentNode && currentNode.type !== 'PAGE') {
                            currentNode = currentNode.parent;
                        }
                        if (currentNode && currentNode.type === 'PAGE') {
                            const pageName = currentNode.name;
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
                }
                catch (e) {
                    // Import failed, continue with fallback
                }
            }
            // Fallback: Use file key as identifier
            const displayName = getLibraryDisplayName(fileKey);
            libraryCache.set(componentKey, displayName);
            return displayName;
        }
        catch (error) {
            console.error('Error getting library name:', error);
            return 'Unknown Library';
        }
    });
}
function findForeignComponents() {
    return __awaiter(this, void 0, void 0, function* () {
        const foreignComponents = [];
        const seenComponents = new Set(); // Track unique components to avoid duplicates
        const componentsToResolve = [];
        let processedCount = 0;
        let totalNodes = 0;
        // First pass: count total nodes for progress tracking
        function countNodes(node) {
            let count = 1;
            if ('children' in node) {
                for (const child of node.children) {
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
        function traverse(node, path = "") {
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
                    const componentInfo = {
                        name: node.name,
                        id: node.id,
                        sourceComponentSet: (componentSet === null || componentSet === void 0 ? void 0 : componentSet.type) === "COMPONENT_SET" ? componentSet.name : mainComponent.name,
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
                for (const child of node.children) {
                    traverse(child, newPath);
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
            const libraryName = yield getLibraryNameFromComponent(mainComponent);
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
    });
}
// Listen for messages from the UI
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'find-components') {
        try {
            const components = yield findForeignComponents();
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
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'debug',
                message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        }
    }
    else if (msg.type === 'select-component' && msg.id) {
        const node = figma.getNodeById(msg.id);
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
});
