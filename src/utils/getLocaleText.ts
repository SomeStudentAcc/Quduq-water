export function getLocalizedText(obj: any, field: string, locale: string): string {
  if (!obj) return "";

  // Construct localized field name
  const localizedField = `${field}_${locale}`;

  // Return localized field if it exists, otherwise fallback to the default field
  return obj[localizedField] ?? obj[field] ?? "";
}
