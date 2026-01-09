# Kinh Nghiệm Build Figma Plugin - Varpro

Tài liệu này ghi lại những kinh nghiệm và best practices học được từ việc xây dựng plugin Varpro để tiết kiệm token và thời gian cho các plugin tương lai.

## 📋 Tổng Quan Project

**Plugin:** Varpro - Variables and Styles Manager
**Chức năng:** Quản lý và chỉnh sửa Figma Variables (colors, typography) và Styles (text, paint)

## 🏗️ Kiến Trúc & Cấu Trúc Project

### 1. Cấu trúc thư mục chuẩn
```
plugin-root/
├── code.ts              # Plugin backend (Figma API)
├── code.js              # Compiled plugin backend
├── manifest.json        # Plugin configuration
├── package.json         # Dependencies & scripts
├── tsconfig.plugin.json # TypeScript config for plugin
├── vite.config.ts       # Vite config for UI
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
├── src/
│   └── ui/
│       ├── index.html
│       ├── main.tsx       # UI entry point
│       ├── App.tsx        # Main UI component
│       ├── types.ts       # Shared types
│       └── components/
│           ├── ui/        # Reusable UI components
│           └── ...        # Feature components
└── dist/                # Build output
    ├── code.js
    └── ui.html
```

### 2. Separation of Concerns
- **Backend (code.ts):** Xử lý Figma API, đọc/ghi variables, styles
- **Frontend (src/ui/):** React UI, user interactions, state management
- **Communication:** `parent.postMessage()` và `figma.ui.onmessage`

## 🔧 Setup & Configuration

### 1. Dependencies quan trọng

#### Build Tools
```json
{
  "devDependencies": {
    "@figma/plugin-typings": "^1.121.0",
    "typescript": "^5.9.3",
    "vite": "^7.3.1",
    "vite-plugin-singlefile": "^2.3.0",
    "@vitejs/plugin-react": "^5.1.2"
  }
}
```

**Lý do:**
- `vite-plugin-singlefile`: Bundle UI thành 1 file HTML duy nhất (yêu cầu của Figma)
- `@figma/plugin-typings`: TypeScript definitions cho Figma Plugin API

#### UI Framework
```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "tailwindcss": "^4.1.18"
  }
}
```

### 2. Build Scripts chuẩn
```json
{
  "scripts": {
    "build": "tsc -p tsconfig.plugin.json && vite build",
    "build:plugin": "tsc -p tsconfig.plugin.json",
    "build:ui": "vite build",
    "watch": "concurrently \"tsc -p tsconfig.plugin.json --watch\" \"vite build --watch\""
  }
}
```

**Best Practice:** Tách riêng build plugin và UI để debug dễ dàng

### 3. TypeScript Configuration

#### tsconfig.plugin.json (cho plugin backend)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "CommonJS",
    "strict": true,
    "outDir": ".",
    "rootDir": "."
  },
  "include": ["code.ts"],
  "exclude": ["src", "node_modules", "dist"]
}
```

**Lưu ý quan trọng:**
- `module: "CommonJS"` - Required cho Figma plugin
- `outDir: "."` - Output code.js cùng cấp với code.ts
- Exclude `src` để tránh conflict với UI config

### 4. Vite Configuration
```javascript
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  root: 'src/ui',
  build: {
    outDir: '../../dist',
    emptyOutDir: false,  // QUAN TRỌNG: không xóa code.js
    rollupOptions: {
      input: 'src/ui/index.html',
      output: {
        entryFileNames: 'ui.js',
        assetFileNames: 'ui.[ext]',
      },
    },
  },
});
```

**Điểm chú ý:**
- `emptyOutDir: false` - Tránh xóa code.js khi build UI
- `viteSingleFile()` - Bundle tất cả thành 1 HTML file

### 5. Manifest Configuration
```json
{
  "name": "Plugin Name",
  "id": "...",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "dist/ui.html",
  "documentAccess": "dynamic-page",
  "editorType": ["figma"],
  "networkAccess": {
    "allowedDomains": ["none"]
  }
}
```

## 💻 Pattern & Code Structure

### 1. Plugin Backend Pattern (code.ts)

#### Type Definitions
```typescript
type PluginVariableData = {
  id: string;
  name: string;
  type: 'COLOR' | 'FLOAT';
  value: string;
};
```

#### Async Data Reading
```typescript
async function readVariables(): Promise<PluginVariableData[]> {
  const variables: PluginVariableData[] = [];
  const localVariables = await figma.variables.getLocalVariablesAsync();

  for (const variable of localVariables) {
    // Process each variable
    const modeId = Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeId];
    // ...
  }

  return variables;
}
```

**Best Practice:**
- Luôn sử dụng async/await cho Figma API calls
- Get mode ID từ `Object.keys(variable.valuesByMode)[0]`
- Format data trước khi gửi cho UI

#### Color Conversion Utilities
```typescript
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function parseColorValue(value: string): RGB | null {
  // Handle #RRGGBB
  if (value.startsWith('#')) {
    const hex = value.substring(1);
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return { r, g, b };
  }

  // Handle rgba(r, g, b, a)
  const rgbaMatch = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  // ...
}
```

**Lưu ý:** Figma sử dụng RGB values từ 0-1, không phải 0-255

#### Message Handler Pattern
```typescript
figma.ui.onmessage = async (msg: {
  type: string;
  // ... other fields
}) => {
  if (msg.type === 'read-data') {
    const variables = await readVariables();
    const styles = await readStyles();

    figma.ui.postMessage({
      type: 'data-loaded',
      variables,
      styles,
    });
  }
  else if (msg.type === 'update-variable') {
    const success = await updateVariable(msg.id!, msg.value!);

    if (success) {
      const variables = await readVariables();
      figma.ui.postMessage({
        type: 'variable-updated',
        variables,
      });
    }
  }
};
```

**Pattern:** Request → Process → Respond với updated data

### 2. UI Frontend Pattern (React)

#### Type Safety với Message Protocol
```typescript
// types.ts
export type PluginMessage =
  | { type: 'data-loaded'; variables: VariableData[]; styles: StyleData[] }
  | { type: 'variable-updated'; variables: VariableData[] }
  | { type: 'variables-scaled'; variables: VariableData[]; successCount: number }
  | { type: 'error'; message: string };
```

#### Communication Setup
```typescript
useEffect(() => {
  // Request data on mount
  parent.postMessage({ pluginMessage: { type: 'read-data' } }, '*');

  // Listen for responses
  const handleMessage = (event: MessageEvent) => {
    const msg = event.data.pluginMessage as PluginMessage;
    if (!msg) return;

    if (msg.type === 'data-loaded') {
      setVariables(msg.variables || []);
      setStyles(msg.styles || []);
      setLoading(false);
    }
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

#### State Preservation Pattern
```typescript
// Preserve selection state when updating data
setVariables((prevVariables) => {
  const selectedIds = new Set(
    prevVariables.filter((v) => v.selected).map((v) => v.id)
  );
  return (msg.variables || []).map((v) => ({
    ...v,
    selected: selectedIds.has(v.id),
  }));
});
```

**Best Practice:** Luôn preserve UI state khi refresh data từ plugin

## 🎨 UI/UX Patterns

### 1. Tailwind CSS với Dark Mode Support
```javascript
// tailwind.config.js
export default {
  content: ['./src/ui/**/*.{ts,tsx,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... CSS variables pattern
      },
    },
  },
};
```

**Best Practice:** Sử dụng CSS variables cho theme để dễ customize

### 2. Component Structure
```
components/
├── ui/                    # Generic reusable components
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── table.tsx
│   ├── checkbox.tsx
│   └── input.tsx
└── [Feature]Table.tsx     # Feature-specific components
    ├── VariablesTable.tsx
    └── StylesTable.tsx
```

### 3. Loading State
```typescript
if (loading) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-2 h-8 w-8 animate-spin rounded-full
                        border-4 border-primary border-t-transparent mx-auto">
        </div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
```

## 🚀 Development Workflow

### 1. Build và Test Flow
```bash
# Development với auto-reload
npm run watch

# Build production
npm run build

# Lint code
npm run lint:fix
```

### 2. Plugin Testing trong Figma
1. Figma Desktop → Plugins → Development → Import plugin from manifest
2. Chọn file `manifest.json`
3. Run plugin để test
4. Khi code thay đổi, close và reopen plugin

### 3. Common Issues & Solutions

#### Issue 1: UI không update sau khi build
**Solution:**
- Check `emptyOutDir: false` trong vite.config
- Verify dist/ui.html được tạo thành công
- Hard refresh plugin (close và reopen)

#### Issue 2: TypeScript errors với Figma types
**Solution:**
- Install `@figma/plugin-typings`
- Add typeRoots trong tsconfig.plugin.json:
  ```json
  "typeRoots": ["./node_modules/@types", "./node_modules/@figma"]
  ```

#### Issue 3: Color conversion không chính xác
**Solution:** Nhớ convert giữa 0-255 (web) và 0-1 (Figma):
```typescript
// Figma → Web
const webColor = Math.round(figmaColor * 255);

// Web → Figma
const figmaColor = webColor / 255;
```

## 📝 Best Practices Checklist

### Development
- [ ] Sử dụng TypeScript cho type safety
- [ ] Tách riêng types vào file types.ts
- [ ] Implement error handling cho mọi async operations
- [ ] Add loading states cho UI
- [ ] Preserve UI state khi refresh data

### Architecture
- [ ] Separation: Backend (code.ts) vs Frontend (src/ui/)
- [ ] Type-safe message protocol
- [ ] Reusable UI components
- [ ] CSS variables cho theming

### Build & Deploy
- [ ] Test build script hoạt động đúng
- [ ] Verify manifest.json paths chính xác
- [ ] Check bundle size (Figma có giới hạn)
- [ ] Test plugin trên nhiều file types

### Performance
- [ ] Minimize data sent giữa plugin và UI
- [ ] Batch operations khi có thể
- [ ] Debounce input changes
- [ ] Lazy load components nếu UI phức tạp

## 🔍 Debug Tips

### 1. Console Logging
```typescript
// Plugin backend
console.log('Plugin:', data); // Shows in Figma DevTools

// UI frontend
console.log('UI:', data); // Shows in plugin UI's DevTools
```

### 2. Figma DevTools
- Mở DevTools: Plugins → Development → Open Console
- View cả plugin logs và UI iframe logs

### 3. Common Debug Commands
```typescript
// Check variable structure
console.log('Variable:', JSON.stringify(variable, null, 2));

// Verify message sending
console.log('Sending message:', msg.type);
```

## 🎯 Optimization Tips

### 1. Token Optimization (cho AI)
- Sử dụng template này để khởi tạo project nhanh
- Reuse component patterns từ plugin trước
- Maintain consistent code structure

### 2. Build Time Optimization
```json
{
  "build": {
    "minify": true,
    "sourcemap": false,
    "rollupOptions": {
      "output": {
        "manualChunks": undefined
      }
    }
  }
}
```

### 3. Runtime Optimization
- Cache data khi có thể
- Debounce frequent operations
- Use React.memo cho expensive components

## 📚 Resources

- [Figma Plugin API Docs](https://www.figma.com/plugin-docs/)
- [Plugin Quickstart](https://www.figma.com/plugin-docs/plugin-quickstart-guide/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 🔄 Template Commands

### Quick Start New Plugin
```bash
# 1. Copy structure
cp -r varpro new-plugin-name

# 2. Update manifest.json
# - Change name, id
# - Update capabilities if needed

# 3. Install dependencies
cd new-plugin-name && npm install

# 4. Start development
npm run watch
```

---

**Cập nhật:** 2026-01-08
**Version:** 1.0
**Next Review:** Khi build plugin tiếp theo
