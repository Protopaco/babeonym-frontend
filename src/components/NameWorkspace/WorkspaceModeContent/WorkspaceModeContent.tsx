import type { ReactNode } from 'react';
import './WorkspaceModeContent.css';

type Props = {
  children: ReactNode;
};

const WorkspaceModeContent = ({ children }: Props) => <section className="workspace-mode-content">{children}</section>;

export default WorkspaceModeContent;
