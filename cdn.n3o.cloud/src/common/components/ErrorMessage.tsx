export function ErrorMessage({ error }: { error: string | undefined }) {
  if (!error) return null;

  return (
    <div className="text-destructive text-sm mt-1">
      {error}
    </div>
  );
}