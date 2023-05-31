exports.getAllTour = async (req, res) => {
  try {
    // 4) pagination and number of result per page
    // setting default page and limit

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    // skip is a amount of results that is skipped before quering data
    // calculate skip value
    const skip = (page - 1) * limit;

    // page=2&limit=10
    query = query.skip(skip).limit(limit);

    // throw error if a given page is not found or made with few limits data

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("this page does not exist");
    }

    // execute the query
    const tours = await query;

    // send response
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
