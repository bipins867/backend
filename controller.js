const path = require("path");
const CrimeReport = require("./models");

const generateReportId = () => {
  const letters = Math.random().toString(36).substring(2, 5).toUpperCase(); // 3 random letters
  const numbers = Math.floor(100 + Math.random() * 900); // 3 random numbers between 100-999
  return `${letters}${numbers}`;
};

// POST: Create a new crime report
const createCrimeReport = async (req, res) => {
  try {
    const { name, email, phoneNumber, location, typesOfCrime } = req.body;
    const reportId = generateReportId();
    let evidenceImage = req.files["evidenceImage"]
      ? req.files["evidenceImage"][0]
      : null;

    const baseDir = path.join(
      __dirname,

      "EvidenceImage",
      reportId
    );

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    const fileName = evidenceImage.originalname; // Original name of the file
    const filePath = path.join(baseDir, fileName);

    fs.writeFileSync(filePath, evidenceImage.buffer);

    const fileRelativePath = `${reportId}/${fileName}`;

    // Create the new crime report
    const newCrimeReport = await CrimeReport.create({
      reportId,
      name,
      email,
      phoneNumber,
      location,
      typesOfCrime,
      evidenceImage: fileRelativePath,
    });

    return res.status(201).json(newCrimeReport);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error creating crime report", details: error.message });
  }
};

// GET: Fetch crime report by reportId
const getCrimeReportById = async (req, res) => {
  try {
    const { reportId } = req.params;

    // Find the crime report by reportId
    const crimeReport = await CrimeReport.findOne({ where: { reportId } });

    if (!crimeReport) {
      return res.status(404).json({ error: "Crime report not found" });
    }

    return res.status(200).json(crimeReport);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching crime report", details: error.message });
  }
};

// GET: Fetch all crime reports
const getAllCrimeReports = async (req, res) => {
  try {
    // Fetch all crime reports
    const crimeReports = await CrimeReport.findAll();

    return res.status(200).json(crimeReports);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching crime reports", details: error.message });
  }
};

module.exports = { getAllCrimeReports, getCrimeReportById, createCrimeReport };
