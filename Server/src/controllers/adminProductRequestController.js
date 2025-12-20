const ProductRequest = require("../models/productRequestModel");

const getAllProductRequests = async (req, res) => {
  try {
    const requests = await ProductRequest.find()
      .populate("seller", "name email shopName")
    //   .populate({
    //     path: "product",
    //     select: "name description images brand category",
    //     populate: {
    //       path: "category",
    //       select: "name",
    //     },
    //   })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("ADMIN PRODUCT REQUEST ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveProductRequest = async (req, res) => {
  const request = await ProductRequest.findById(req.params.id).populate(
    "product"
  );

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const product = await Product.create({
    name: request.product.name,
    description: request.product.description,
    category: request.product.category,
    images: request.product.images,
    brand: request.product.brand,
    createdBy: "admin",
  });

  request.status = "approved";
  request.approvedProduct = product._id;
  await request.save();

  res.json({
    success: true,
    message: "Product approved & added to master catalog",
  });
};

const rejectProductRequest = async (req, res) => {
  const { note } = req.body;

  if (!note || note.length < 3) {
    return res.status(400).json({ message: "Rejection note required" });
  }

  const request = await ProductRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Request not found" });

  request.status = "rejected";
  request.adminNote = note;
  await request.save();

  res.json({
    success: true,
    message: "Product request rejected",
  });
};

module.exports = {
  getAllProductRequests,
  rejectProductRequest,
  approveProductRequest,
};
