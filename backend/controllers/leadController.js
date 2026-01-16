import Lead from "../models/Lead.js";

//fetch lead by id
export const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lead" });
  }
};
//fetch all leads
export const getLeads = async (req, res) => {
  try {
    const {
      search,
      status,
      source,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    //searching by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    //filtering by status
    if (status) {
      query.status = status;
    }

    //filtering by source
    if (source) {
      query.source = source;
    }

    //pagination
    const skip = (Number(page) - 1) * Number(limit);

    //sorting, fetching leads from db
    const leads = await Lead.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    //total count for pagination
    const total = await Lead.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};
