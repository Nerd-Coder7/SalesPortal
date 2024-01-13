const { getClient,createClient, updateClient, removeClient } = require("../controllers/client.controller");
const {
  getCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/jobCategory.controller");
const {
  getPortal,
  createPortal,
  updatePortal,
  removePortal,
} = require("../controllers/portal.controller");
const {
  getPortalProfile,
  removePortalProfile,
  createPortalProfile,
  updatePortalProfile,
} = require("../controllers/portalProfile.controller");
const { getProposal, createProposal, updateProposal, removeProposal, getSingleProposal, getAllStats } = require("../controllers/proposal.controller");

const router = require("express").Router();

//Portal
router.get("/", getPortal);
router.post("/create", createPortal);
router.patch("/update/:portalId", updatePortal);
router.delete("/remove/:portalId", removePortal);

// Portal Profile
router.get("/profile", getPortalProfile);
router.post("/create_profile", createPortalProfile);
router.patch("/update_profile/:portalProfileId", updatePortalProfile);
router.delete("/remove_profile/:portalProfileId", removePortalProfile);

//Job Category
router.get("/category", getCategory);
router.post("/create_category", createCategory);
router.patch("/update_category/:categoryId", updateCategory);
router.delete("/remove_category/:categoryId", removeCategory);


//Clients:
router.get("/clients", getClient);
router.post("/create_client", createClient);
router.patch("/update_client/:ClientId",updateClient );
router.delete("/remove_client/:ClientId",removeClient );


//Proposals:
router.get("/stats", getAllStats);
router.get("/proposals", getProposal);
router.get("/proposal/:ProposalId", getSingleProposal);
router.post("/create_proposal", createProposal);
router.patch("/update_proposal/:ProposalId",updateProposal );
router.delete("/remove_proposal/:ProposalId",removeProposal );

module.exports = router;
