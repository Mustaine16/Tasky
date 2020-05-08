export default function (res,err) {
  console.log(err);
  if (err.errors) {
    const errors = err.errors.map((err) => err.message);
    res.json({ errors });
  } else {
    res.json( {err} );
  }
}
