export function validateRow(row) {
  const errors = [];

  if (!row.product_id) {
    errors.push("product_id requerido");
  }

  if (!row.author_name) {
    errors.push("author_name requerido");
  }

  const rating = Number(row.rating);

  if (!row.rating || isNaN(rating) || rating < 1 || rating > 5) {
    errors.push("rating inválido (1-5)");
  }

  return errors;
}