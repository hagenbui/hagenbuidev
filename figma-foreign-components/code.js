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
    width: 450,
    height: 500,
    themeColors: true
});
function findForeignComponents() {
    const foreignComponents = [];
    // Recursively search through all nodes in the document
    function traverse(node, path = "") {
        var _a;
        if (node.type === "INSTANCE") {
            const mainComponent = node.mainComponent;
            if (mainComponent) {
                // Check if the component is from another file
                const isRemote = mainComponent.remote;
                if (isRemote) {
                    const componentSet = mainComponent.parent;
                    // Get library name from the remote component's source file
                    const libraryName = mainComponent.description ?
                        ((_a = mainComponent.description.split(' from ')[1]) === null || _a === void 0 ? void 0 : _a.split('.figma')[0]) || "Unknown Library" :
                        "Unknown Library";
                    foreignComponents.push({
                        name: node.name,
                        id: node.id,
                        sourceComponentSet: (componentSet === null || componentSet === void 0 ? void 0 : componentSet.type) === "COMPONENT_SET" ? componentSet.name : mainComponent.name,
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
            node.children.forEach(child => traverse(child, newPath));
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
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'find-components') {
        findForeignComponents();
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
