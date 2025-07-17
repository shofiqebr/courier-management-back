import { z } from 'zod';

export const ParcelValidation = {
  createParcelZodSchema: z.object({
    body: z.object({
      pickupAddress: z.string().min(5),
      deliveryAddress: z.string().min(5),
      parcelType: z.enum(['Small', 'Medium', 'Large', 'Fragile', 'Document']),
      isCOD: z.boolean(),
      amount: z.number().min(0),
      deliveryCoordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
      pickupCoordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
    }),
  }),

  updateStatusSchema: z.object({
    body: z.object({
      status: z.enum(['Picked Up', 'In Transit', 'Delivered', 'Failed']),
    }),
  }),
};

