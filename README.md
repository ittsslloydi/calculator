# Samsung Style Calculator with History

A fully functional, premium mobile-style calculator application inspired by Samsung's design language with a complete calculation history feature, floating UI design, and real-time validation.

## 🎯 Features

### Calculator Features

- ✅ **All Operations**: +, −, ×, ÷, %, (), ±
- ✅ **Real-time Calculation**: Expression and result display with automatic validation
- ✅ **Decimal Support**: Full decimal number support
- ✅ **Parentheses**: Grouped calculations with proper precedence
- ✅ **Dynamic Font Scaling**: Results scale from 52px → 16px for long numbers
- ✅ **AMOLED Dark Theme**: Pure black background optimized for battery savings
- ✅ **Floating Design**: Elegant rounded corners with multi-layer shadows and green glow effects

### History Features

- ✅ **Persistent Storage**: All calculations auto-save to browser localStorage
- ✅ **Toggle View**: Switch between calculator and history with clock icon (🕘)
- ✅ **Organized Display**: Expressions in white, results in green, newest first
- ✅ **Clickable History**: Click any entry to load it as new input
- ✅ **Clear All**: One-click clear history button
- ✅ **Input Preservation**: Calculator state preserved when switching views

### Input Methods

- 🖱️ **Click Buttons**: Touch/mouse support for all operations
- ⌨️ **Keyboard Support**: Numbers (0-9), operators (+, −, ×, ÷, %), Enter/Backspace
- ✅ **Validation**: Real-time input validation with popup alerts

## 🚀 How to Use

### Basic Calculations

1. Click number buttons (0-9) to enter values
2. Click operator buttons (+, −, ×, ÷, %) to select operations
3. Click equals (=) button to compute result
4. Results automatically save to history

### Advanced Features

- **Parentheses**: Use ( and ) for grouped calculations
- **Percentage**: Press % to calculate percentages
- **Decimal**: Press . for decimal numbers
- **Toggle Sign**: Press ± to switch between positive/negative
- **Clear One**: Press C to delete the last digit
- **Clear All**: Press ✕ (top-right) to reset everything

### Keyboard Shortcuts

| Action      | Key           |
| ----------- | ------------- |
| Numbers     | 0-9           |
| Operators   | +, −, ×, ÷, % |
| Calculate   | Enter or =    |
| Decimal     | . (period)    |
| Delete      | Backspace     |
| Parentheses | ( and )       |

### Viewing History

1. Click the clock icon (🕘) to switch to history view
2. View all past calculations organized by expression and result
3. Click any history entry to load it as your new input
4. Click the green "Clear History" button to delete all calculations
5. Click the clock again to return to calculator

## 🎨 Design Specifications

### Color Palette

| Element          | Color      | Hex Code |
| ---------------- | ---------- | -------- |
| Background       | Pure Black | #000     |
| Text             | White      | #ffffff  |
| Result (Final)   | Lime Green | #6aa84f  |
| Function Buttons | Lime Green | #6aa84f  |
| Clear Button     | Red        | #ff6f6f  |
| Expression       | Gray       | #8a8a8a  |

### Layout

- **Button Size**: 72px diameter circles
- **Container**: Max-width 360px, full height responsive
- **Border Radius**: 24px (main), 16px (sub-sections), 50% (buttons)
- **Gaps**: 16px between all elements
- **Shadows**: Multi-layer shadows for floating effect

## 📁 File Structure

```
calculator/
├── index.html         # Semantic HTML structure with display and keypad
├── style.css          # Professional styling with animations
├── script.js          # Calculator logic & event handling
└── README.md          # This file
```

## 🔧 Technical Details

### How It Works

1. **Input Processing**: Buttons and keyboard input added to expression string
2. **Real-time Display**: Expression shown in gray, result updates dynamically
3. **Calculation**: When = is pressed, expression is evaluated using safe math evaluation
4. **History Management**: Each calculation auto-saved to localStorage
5. **View Switching**: Toggle between calculator and history with state preservation

### Math Evaluation

- **Safe Evaluation**: Uses Function constructor (never `eval()`)
- **Operator Precedence**: × ÷ before + − (PEMDAS compliant)
- **Parentheses**: Full support with nesting
- **Error Handling**: Shows "Error" for invalid expressions

### Data Persistence

- **Storage Method**: Browser localStorage API
- **Storage Key**: "calcHistory"
- **Format**: JSON array of `{exp: string, res: number}`
- **Capacity**: 5-10MB typical (sufficient for 1000+ calculations)

## ✅ Browser Compatibility

| Browser       | Version | Support |
| ------------- | ------- | ------- |
| Chrome        | 90+     | ✅ Full |
| Firefox       | 88+     | ✅ Full |
| Safari        | 14+     | ✅ Full |
| Edge          | 90+     | ✅ Full |
| Mobile Safari | 14+     | ✅ Full |

## 📦 Quick Start

1. Download: `index.html`, `style.css`, `script.js`
2. Open `index.html` in any modern web browser
3. Start calculating!

---

**Version**: 2.0  
**Last Updated**: December 27, 2025  
**Status**: ✅ Production Ready
