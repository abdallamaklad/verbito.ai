import { Palette } from 'lucide-react';
import ToolPageLayout from './ToolPageLayout';

export default function MidjourneyPromptGenerator() {
  return (
    <ToolPageLayout
      slug="midjourney-prompt-generator"
      h1="Midjourney Prompt Generator"
      subtitle="Create stunning AI art prompts for Midjourney V5, V6, and V7. Master prompt engineering for photorealistic and artistic images."
      category="Midjourney"
      defaultOutputType="Image Prompt"
      seoTitle="Midjourney Prompt Generator — AI Art Prompts | Verbito.ai"
      seoDescription="Generate optimized Midjourney prompts for stunning AI art. Create photorealistic, artistic, and stylized images with our free prompt generator."
      ogImage="/og-midjourney-prompts.jpg"
      icon={Palette}
      iconColor="text-fuchsia-600"
      gradientFrom="from-fuchsia-100"
      gradientTo="to-pink-100"
      educationContent={{
        whatIs: "a Midjourney Prompt",
        whyUse: "Midjourney prompts are text instructions that guide the AI to create specific visual outputs. Unlike standard AI prompts, Midjourney prompts use a unique syntax with parameters, style references, and descriptive keywords. A well-crafted Midjourney prompt can mean the difference between a generic image and a stunning, portfolio-worthy piece of AI art.",
        bestPractices: [
          "Start with the main subject, then add details about style, lighting, and composition.",
          "Use artistic style references (e.g., 'in the style of...').",
          "Include camera and lens specifications for photorealistic images.",
          "Specify lighting conditions (golden hour, studio, dramatic, etc.).",
          "Add aspect ratio parameters (--ar 16:9) for the right format.",
          "Use style parameters (--s 250) to control artistic intensity.",
          "Include negative prompts (--no text, watermark) to exclude unwanted elements.",
        ],
        tips: [
          "Use double colons (::) for multi-prompts with weighted emphasis.",
          "Reference specific artists or art movements for unique styles.",
          "Include environmental details (weather, time of day, location).",
          "Request specific camera angles and perspectives.",
          "Use the --chaos parameter (0-100) for more varied results.",
          "Add --tile for seamless repeating patterns.",
        ],
        examples: [
          { title: "Portrait Photography", description: "Professional portrait of a confident businesswoman in her 30s, wearing a tailored navy blazer, soft studio lighting with rim light, shallow depth of field, shot on Canon EOS R5 with 85mm f/1.2 lens, neutral gray background, editorial style --ar 3:4 --s 200 --q 2" },
          { title: "Product Visualization", description: "Premium matte black wireless headphones on a marble pedestal, dramatic lighting with soft shadows, minimalist product photography, clean white background with subtle gradient, reflection on surface, shot with macro lens, commercial photography style --ar 1:1 --s 150" },
          { title: "Fantasy Landscape", description: "Majestic floating islands with cascading waterfalls in a golden sunset sky, lush vegetation and ancient ruins, dramatic volumetric lighting, painted in the style of Albert Bierstadt and Studio Ghibli, epic scale, highly detailed, cinematic composition --ar 16:9 --s 300 --q 2" },
          { title: "Interior Design", description: "Modern minimalist living room with floor-to-ceiling windows overlooking a city skyline at dusk, warm wood accents, designer furniture, indoor plants, soft ambient lighting, architectural photography style, clean lines, cozy atmosphere --ar 16:9 --s 200" },
        ],
      }}
      faqs={[
        { question: "What is the best Midjourney version to use?", answer: "Midjourney V6 offers excellent photorealism and prompt understanding. V7 (when available) may add further improvements. Our prompts work across all versions." },
        { question: "How do I get photorealistic images from Midjourney?", answer: "Use specific camera and lens references, mention lighting conditions, include details about depth of field, and add parameters like --q 2 for higher quality. Our generator handles this automatically." },
        { question: "Can I use Midjourney-generated images commercially?", answer: "Yes, with a paid Midjourney subscription you have commercial usage rights. Always check Midjourney's current Terms of Service for the latest licensing information." },
      ]}
    />
  );
}
