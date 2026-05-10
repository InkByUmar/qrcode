'use server';
/**
 * @fileOverview An AI tool that suggests more concise or impactful wording for text embedded in a QR code.
 *
 * - qrContentRefiner - A function that refines the input text for QR code content.
 * - QrContentRefinerInput - The input type for the qrContentRefiner function.
 * - QrContentRefinerOutput - The return type for the qrContentRefiner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QrContentRefinerInputSchema = z.object({
  text: z.string().describe('The text content to be refined for a QR code.'),
});
export type QrContentRefinerInput = z.infer<typeof QrContentRefinerInputSchema>;

const QrContentRefinerOutputSchema = z.string().describe('The refined text content suitable for a QR code.');
export type QrContentRefinerOutput = z.infer<typeof QrContentRefinerOutputSchema>;

export async function qrContentRefiner(input: QrContentRefinerInput): Promise<QrContentRefinerOutput> {
  return qrContentRefinerFlow(input);
}

const qrContentRefinerPrompt = ai.definePrompt({
  name: 'qrContentRefinerPrompt',
  input: {schema: QrContentRefinerInputSchema},
  output: {schema: QrContentRefinerOutputSchema},
  prompt: `You are an AI assistant specialized in creating concise and impactful text, particularly for QR code content. Your goal is to take the provided text and refine it to be as clear, brief, and effective as possible, suitable for a QR code where every character counts. Focus on enhancing clarity and call-to-action effectiveness.

Here is the text to refine:
"""{{{text}}}"""

Provide only the refined text, without any additional commentary or explanation.`,
});

const qrContentRefinerFlow = ai.defineFlow(
  {
    name: 'qrContentRefinerFlow',
    inputSchema: QrContentRefinerInputSchema,
    outputSchema: QrContentRefinerOutputSchema,
  },
  async input => {
    const {output} = await qrContentRefinerPrompt(input);
    return output!;
  }
);
