import NameEvaluator from '@/components/NameGenerator/NameEvaluator/NameEvaluator';
import Box from '@mui/material/Box';
import './NameGenerator.css';

// MobileNameFilters used to be rendered here. It is position: fixed, and this
// component sits inside the pane WorkspaceModeContent slides between modes — a
// transform on an ancestor becomes the containing block for a fixed descendant,
// so mid-transition the bar measured its bottom from the pane rather than the
// viewport. It now lives on the page, outside the animation.
export default () => {
  return (
    <Box className="name-generator-mode-content">
      <NameEvaluator />
    </Box>
  );
};
