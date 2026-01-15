import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;

    --bg: #0b0d10;
    --panel: #10141a;
    --panel-2: #0e1217;
    --panel-hover: #141a22;
    --border: rgba(255, 255, 255, 0.08);
    --border-strong: rgba(255, 255, 255, 0.12);
    --text: rgba(255, 255, 255, 0.92);
    --text-muted: rgba(255, 255, 255, 0.64);
    --text-faint: rgba(255, 255, 255, 0.44);
    --shadow: rgba(0, 0, 0, 0.45);
    --accent: #6aa7ff;
    --accent-2: #9bffd7;
    --danger: #ff5c7a;
    --success: #4ee08a;
    --warning: #ffd27a;

    --radius-lg: 14px;
    --radius-md: 10px;
    --radius-sm: 8px;
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }

  body {
    margin: 0;
    background: radial-gradient(1200px 700px at 35% -10%, rgba(106, 167, 255, 0.12), transparent 55%),
                radial-gradient(900px 500px at 95% 0%, rgba(155, 255, 215, 0.08), transparent 50%),
                var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
      "Segoe UI Emoji";
    letter-spacing: -0.01em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
  }

  ::selection { background: rgba(106, 167, 255, 0.28); }
`;

