export default function middlewarePipeline(
  context: { next: any },
  middleware: { [x: string]: any },
  index: number
): Function {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) {
    return context.next;
  }

  return async () => {
    await nextMiddleware({
      ...context,
      next: await middlewarePipeline(context, middleware, index + 1),
    });
  };
}