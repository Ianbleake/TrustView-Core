
export function reviewResponseFormat (review) {

  return {
    id: review.id,
    author: review.author_name,
    rating: review.rating,
    content: review.content,
    product: review.product_name,
    date: review.created_at,
    status: review.approved === true ? "approved" : review.approved === false ? "rejected" : review.approved === null ? "pending" : null,
  }

}