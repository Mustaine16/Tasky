export default function (res, err) {
  console.log(err);
  if (err.errors) {
    const errors = err.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  } else {
    return res.status(500).json({ errors: { name: err.name, detail: err} });
  }
}
