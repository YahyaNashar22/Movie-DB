// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Movie-DB");

// Create a new document in the collection.
db.getCollection("movies").insertOne({
  title: "second installation",
  year: 2025,
  rating: 8,
});
