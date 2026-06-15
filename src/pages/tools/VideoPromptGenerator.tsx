import { Video } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function VideoPromptGenerator() {
  return (
    <ToolPageLayout
      slug="video-prompt-generator"
      h1="Video Prompt Generator"
      subtitle="Create AI video prompts for Sora, Runway Gen-2, Pika, and other video generation models."
      category="Video Generation"
      defaultOutputType="Video Prompt"
      seoTitle="AI Video Prompt Generator — Sora, Runway | Verbito.ai"
      seoDescription="Generate optimized AI video prompts for Sora, Runway Gen-2, Pika, and other video generation models. Create stunning video content with structured prompts."
      ogImage="/og-video-prompts.jpg"
      icon={Video}
      iconColor="text-red-500"
      gradientFrom="from-red-100"
      gradientTo="to-rose-100"
      educationContent={{
        whatIs: "an AI Video Prompt",
        whyUse: "AI video prompts are detailed text descriptions that guide video generation models like Sora, Runway Gen-2, and Pika to create specific video clips. Unlike image prompts, video prompts must also describe motion, temporal changes, camera movement, and scene transitions. A well-crafted video prompt results in smooth, coherent, and visually compelling AI-generated video.",
        bestPractices: [
          "Start with a clear scene description, then add motion and camera details.",
          "Describe camera movement (pan, zoom, dolly, handheld, static).",
          "Specify the duration and pacing of the video.",
          "Include temporal transitions (fade in, dissolve, cut).",
          "Describe lighting changes over time (sunrise to noon, etc.).",
          "Add motion details for each element in the scene.",
          "Specify video style (cinematic, documentary, animation, etc.).",
        ],
        tips: [
          "Keep prompts focused on a single scene or action for best coherence.",
          "Use cinematic terminology for professional-looking results.",
          "Describe the emotional arc or mood progression.",
          "Include specific frame rate or smoothness preferences.",
          "Reference film styles or directors for specific aesthetics.",
          "Describe foreground and background motion separately.",
        ],
        examples: [
          { title: "Cinematic B-Roll", description: "Slow cinematic aerial drone shot gliding over a misty mountain valley at sunrise. Golden light breaking through clouds, revealing a winding river below. Pine forest on the hillsides, subtle morning fog. Smooth, majestic camera movement. Shot in the style of a BBC nature documentary, 4K quality, highly detailed landscape." },
          { title: "Product Demo", description: "Smooth product showcase of a sleek silver laptop on a clean white desk. Camera slowly orbits around the product, soft studio lighting creating elegant reflections on the metal surface. Minimalist background, professional commercial style. Clean, modern aesthetic with subtle depth of field." },
          { title: "Social Media Clip", description: "Energetic motion graphics intro for a fitness YouTube channel. Bold text animation 'DAILY WORKOUT' with dynamic transitions, energetic music-synced motion, vibrant orange and black color scheme, fast-paced cuts, modern typography, high energy and motivation." },
          { title: "Animated Explainer", description: "Clean 2D animation of a lightbulb transforming into a growing tree. Soft pastel colors, smooth morphing animation, white background, flat design style with subtle shadows. Symbolic representation of ideas growing into reality. Gentle, calming motion with professional easing." },
        ],
      }}
      faqs={[
        { question: "Which AI video generator is best?", answer: "Sora (OpenAI) leads in realism and coherence. Runway Gen-2 offers excellent creative control. Pika is great for quick social clips. Kling produces strong results for character videos. Each has unique strengths." },
        { question: "How long can AI-generated videos be?", answer: "Most AI video generators currently produce 4-10 second clips. Some platforms allow extending videos or stitching multiple clips together. Our prompts are optimized for single-clip generation." },
        { question: "Can I use AI-generated videos commercially?", answer: "Most paid plans allow commercial use. Check your chosen platform's terms of service for specific licensing details." },
      ]}
    />
  );
}
