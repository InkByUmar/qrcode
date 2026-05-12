'use server';
/**
 * @fileOverview An AI tool that generates artistic backgrounds for QR codes using Imagen 4.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BackgroundGeneratorInputSchema = z.object({
  prompt: z.string().describe('The theme or prompt for the background image.'),
});

export async function generateQrBackground(prompt: string): Promise<string> {
  return qrBackgroundGeneratorFlow({ prompt });
}

const qrBackgroundGeneratorFlow = ai.defineFlow(
  {
    name: 'qrBackgroundGeneratorFlow',
    inputSchema: BackgroundGeneratorInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    try {
      const { media } = await ai.generate({
        model: 'googleai/imagen-3-fast-generate-001',
        prompt: `A high-contrast, minimalist artistic background for a QR code. Theme: ${input.prompt}. Dark aesthetic with vibrant neon accents. Ensure the center is relatively clear for QR scannability. Minimal noise, professional graphic design style.`,
      });
      
      if (!media) throw new Error('Generation failed: No media returned');
      return media.url;
    } catch (error: any) {
      console.error('Imagen generation error:', error);
      throw new Error(`AI Background generation failed: ${error.message || 'Unknown error'}`);
    }
  }
);
