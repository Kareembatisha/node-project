let requests = ["body", "params", "query"];

export const validation = (schema) => {
  return (req, res, next) => {
    let errors = [];
    requests.forEach((ele) => {
      if (schema[ele]) {
        let check = schema[ele].validate(req[ele], { abortEarly: true });
        if (check && check.error) {
          errors.push(check.error.details);
        }
      }
    });
    if (errors.length) {
      res.status(400).json({ message: "validation error", error: errors });
    } else {
      next();
    }
  };
};
