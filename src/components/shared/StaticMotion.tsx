import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';

interface MotionOnlyProps {
  animate?: unknown;
  custom?: unknown;
  exit?: unknown;
  initial?: unknown;
  transition?: unknown;
  variants?: unknown;
  viewport?: unknown;
  whileInView?: unknown;
}

type StaticDivProps = HTMLAttributes<HTMLDivElement> & MotionOnlyProps;
type StaticParagraphProps = HTMLAttributes<HTMLParagraphElement> & MotionOnlyProps;
type StaticAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & MotionOnlyProps;

export function StaticMotionDiv({ animate, custom, exit, initial, transition, variants, viewport, whileInView, ...props }: StaticDivProps) {
  void animate; void custom; void exit; void initial; void transition; void variants; void viewport; void whileInView;
  return <div {...props} />;
}

export function StaticMotionParagraph({ animate, custom, exit, initial, transition, variants, viewport, whileInView, ...props }: StaticParagraphProps) {
  void animate; void custom; void exit; void initial; void transition; void variants; void viewport; void whileInView;
  return <p {...props} />;
}

export function StaticMotionAnchor({ animate, custom, exit, initial, transition, variants, viewport, whileInView, ...props }: StaticAnchorProps) {
  void animate; void custom; void exit; void initial; void transition; void variants; void viewport; void whileInView;
  return <a {...props} />;
}
