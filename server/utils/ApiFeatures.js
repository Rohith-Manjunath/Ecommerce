class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["limit", "page", "keyword"];
    for (let key of removeFields) {
      delete queryCopy[key];
    }

    // Handle rating separately
    const { ratings, ...rest } = queryCopy;

    let queryStr = JSON.stringify(rest);

    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);

    // Parse the rest of the query
    this.query = this.query.find(JSON.parse(queryStr));

    // Handle ratings
    if (ratings) {
      // Assuming ratings is an object with gte and lte properties
      const { gte, lte } = ratings;
      if (gte) this.query = this.query.where("ratings").gte(gte);
      if (lte) this.query = this.query.where("ratings").lte(lte);
    }

    return this;
  }

  pagination(perpage) {
    const page = Number(this.queryStr.page);

    const skip = perpage * (page - 1);
    this.query = this.query.skip(skip).limit(perpage);

    return this;
  }
}

module.exports = ApiFeatures;
