export default function (res, err) {
  console.log(err);
  if (err.name == "SequelizeValidationError") {
    
    const errors = err.errors.map((err) => {
      return {
        message: err.message,
        type: err.path
      }
        
    });
    return res.status(500).json({ errors });
  } else {
    return res.status(500).json({ err, detail:err.parent.detail });
  }
}
