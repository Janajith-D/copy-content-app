import { connectorTheme } from "akeneo-design-system";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./common/components/Loading";
import NotFound from "./common/components/NotFound";
import CopyContent from "./apps/copy-content";
import ImageViewer from "./apps/image-viewer";
import IrexSequence from "./apps/irex-sequence";

export default function App() {
  return (
    <ThemeProvider theme={connectorTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/image-viewer" element={<ImageViewer />} />
          <Route path="/copy-content" element={<CopyContent />} />
          <Route path="/irex-sequence" element={<IrexSequence />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
