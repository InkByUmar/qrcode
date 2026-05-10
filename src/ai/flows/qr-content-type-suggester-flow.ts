'use server';
/**
 * @fileOverview An AI agent that suggests the most appropriate QR code content type based on user input.
 *
 * - suggestQrContentType - A function that suggests a QR code content type.
 * - QrContentTypeSuggesterInput - The input type for the suggestQrContentType function.
 * - QrContentTypeSuggesterOutput - The return type for the suggestQrContentType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QrContentTypeSuggesterInputSchema = z.object({
  content: z
    .string()
    .describe('The user-provided content for which to suggest a QR code type.'),
});
export type QrContentTypeSuggesterInput = z.infer<
  typeof QrContentTypeSuggesterInputSchema
>;

const QrContentTypeSuggesterOutputSchema = z.object({
  type: z
    .enum(['URL', 'Text', 'Phone', 'Email', 'WiFi'])
    .describe('The suggested QR code content type.'),
});
export type QrContentTypeSuggesterOutput = z.infer<
  typeof QrContentTypeSuggesterOutputSchema
>;

export async function suggestQrContentType(
  input: QrContentTypeSuggesterInput
): Promise<QrContentTypeSuggesterOutput> {
  return qrContentTypeSuggesterFlow(input);
}

const qrContentTypeSuggesterPrompt = ai.definePrompt({
  name: 'qrContentTypeSuggesterPrompt',
  input: {schema: QrContentTypeSuggesterInputSchema},
  output: {schema: QrContentTypeSuggesterOutputSchema},
  prompt: `Analyze the following user content and determine the most appropriate QR code content type.
Choose one from 'URL', 'Text', 'Phone', 'Email', or 'WiFi'.

Content: {{{content}}}`,
});

const qrContentTypeSuggesterFlow = ai.defineFlow(
  {
    name: 'qrContentTypeSuggesterFlow',
    inputSchema: QrContentTypeSuggesterInputSchema,
    outputSchema: QrContentTypeSuggesterOutputSchema,
  },
  async input => {
    const {output} = await qrContentTypeSuggesterPrompt(input);
    return output!;
  }
);
