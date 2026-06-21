import { Image } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function ImagePromptGenerator() {
  return (
    <ToolPageLayout
      slug="image-prompt-generator"
      h1="Image Prompt Generator"
      subtitle="Create AI image prompts for DALL-E, Stable Diffusion, Leonardo AI, and other image generation models."
      category="Image Generation"
      defaultOutputType="Image Prompt"
      seoTitle="AI Image Prompt Generator — DALL-E, Stable Diffusion | Verbito.ai"
      seoDescription="Generate optimized AI image prompts for DALL-E 3, Stable Diffusion, and other image generators. Create stunning visuals with structured prompts."
      ogImage="/og-default.jpg"
      icon={Image}
      iconColor="text-teal-600"
      gradientFrom="from-teal-100"
      gradientTo="to-emerald-100"
      educationContent={{
        whatIs: "an AI Image Prompt",
        whyUse: "AI image prompts are detailed text descriptions that guide image generation models like DALL-E 3, Stable Diffusion, and Leonardo AI to create specific visuals. A well-structured image prompt includes the subject, style, composition, lighting, color palette, and mood — resulting in images that closely match your creative vision.",
        bestPractices: [
          "Start with a clear, specific subject description.",
          "Include art style or medium (oil painting, digital art, photograph, etc.).",
          "Specify composition (close-up, wide shot, aerial view, etc.).",
          "Describe lighting conditions in detail.",
          "Add color palette or mood descriptors.",
          "Include quality modifiers (highly detailed, 8K, photorealistic).",
          "Mention what to exclude or avoid in the image.",
        ],
        tips: [
          "Use specific artistic references for consistent style (e.g., 'in the style of...').",
          "Include camera settings for photorealistic outputs (focal length, aperture).",
          "Describe the background and foreground separately.",
          "Add texture and material descriptions for physical objects.",
          "Specify the time period or era for context.",
          "Use emotional descriptors to guide the mood and atmosphere.",
        ],
        examples: [
          { title: "Social Media Graphic", description: "Create a vibrant Instagram post graphic for a summer sale. Bright tropical colors, palm leaves border, bold typography space in center, playful and energetic vibe, flat design style with subtle gradients, clean modern aesthetic, 1080x1080 format" },
          { title: "Character Design", description: "Design a friendly robot mascot for a tech startup. Rounded shapes, soft blue and white color scheme, LED eyes with warm glow, small and approachable proportions, clean vector art style, white background, multiple poses implied" },
          { title: "Book Cover", description: "Epic fantasy book cover illustration of a lone warrior standing at the edge of a cliff overlooking a vast magical kingdom with floating castles, dramatic stormy sky with rays of golden light breaking through, oil painting style, rich deep colors, cinematic composition, highly detailed" },
          { title: "Infographic Element", description: "Clean minimalist illustration of a 3-step process flow. Soft pastel colors, rounded rectangles with icons connected by curved arrows, modern UI style, white background, professional and easy to understand, suitable for business presentation" },
        ],
      }}
      faqs={[
        { question: "Which AI image generator is best?", answer: "DALL-E 3 excels at following complex instructions. Midjourney produces the most artistic results. Stable Diffusion offers the most control and customization. Leonardo AI is great for game assets. The best choice depends on your specific needs." },
        { question: "How detailed should my image prompt be?", answer: "More detail generally produces better results. Include subject, style, lighting, composition, colors, and mood. Our generator structures these elements optimally." },
        { question: "Can I use AI-generated images commercially?", answer: "Most AI image generators allow commercial use with paid plans. Always check the specific platform's terms of service. Our prompts don't affect usage rights." },
      ]}
    />
  );
}
