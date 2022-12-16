const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("./models/user")
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const Admissions = require("./models/admission")
const PDFDocument = require('pdfkit')
app.use(cors());
app.use(express.json());


const path = require("path");
const connectDB = require("./Config/db");
const auth = require("./middleware/auth");

connectDB();

const PORT = process.env.PORT || 5001;



app.post("/api/register",
    [check("emp_id", "Please provide Employee id").notEmpty()],
    [check("name", "Please provide  name").notEmpty()],
    [check("email", "Please provide a valid email").isEmail()],
    [check("psw","Please provide a password 8 charecter long password").isLength({ min: 8 }),],
    [check("phone", "Please provide a valid phone").notEmpty()],
    [check("designation", "Please provide a designation").notEmpty()],

    async (req, res) => {

        const { emp_id,name,email,psw, phone, designation  } = req.body;

        const errors = validationResult(req);
        // console.log(req);

        if (!errors.isEmpty()) {
            return res.json({ status: "error-psw", error: "Invalid" });

        } else {
            try {
                let user = await User.findOne({ email });
                if (user) {
                    return res.json({ status: "error-email", error: "Invalid" });
                }
                try{
                    let user_team = await User.findOne({ teamName });
                    if (user_team) {
                        return res.json({ status: "error-team", error: "Invalid" });
                    }}
                catch{}
            }
            catch(error){

            }
        }

        try {
            let user =new User({
                emp_id,
                name,
                email,
                psw,
                phone,
                designation

            });

            // console.table(user);

            const salt = await bcrypt.genSalt(10);
            user.psw = await bcrypt.hash(psw, salt)
            // console.log(psw);
            await user.save();

            res.json({ status: "Okay" });
        } catch (error) {
            res.json({ status: "error", error: error });
            console.error(error);
        }
    });

app.post( "/api/login",
    [check("email", "Please provide a valid email").isEmail()],
    [
        check(
            "psw",
            "Please provide a password 8 character long password"
        ).isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { email, psw } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.json({ status: "error", error: "invalid" });
            }

            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    user_id:user._id,
                },
                'bigbooster',{
                    expiresIn: "94h",
                }
            )

            user.token = token;

            // console.log(user)

            const match = await bcrypt.compare(psw, user.psw);

            if (!match) {
                return res.json({ status: "error", error: "invalid" });
            }
            else{

                return res.json({ status: "okay", user:token });

            }

        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
);

app.post("/api/submitAdmission",auth,
    async (req, res) => {

        const email = req.headers['email_id']

        let user = await User.findOne({ email });



        const {  name,contact, domain,   totalAmount,  discountAmount, paidAmount,  dueAmount, duePayDate,remark, } = req.body;


        try {
            let admission = new Admissions({
                name:name,
                contact:contact,
                domain:domain,
                totalAmount:totalAmount,
                discountAmount:discountAmount,
                paidAmount:paidAmount,
                dueAmount:dueAmount,
                duePayDate:duePayDate,
                remark:remark,
            });


            admission = await admission.save();
            return res.json({ status: "okay" });


        } catch (err) {
            console.log(err.message);
            return res.json({ status: "error-val", error: "invalid" });
        }
    }
);


app.get('/generatePDF', async function(req, res, next) {
    var myDoc = new PDFDocument({bufferPages: true});

    let buffers = [];
    myDoc.on('data', buffers.push.bind(buffers));
    myDoc.on('end', () => {

        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=test.pdf',})
            .end(pdfData);

    });

    myDoc.font('Times-Roman')
        .fontSize(12)
        .text(`this is a test text`);
    myDoc.end();
});

app.get( "/api/view_admissions",

    async (req, res) => {


        try {

                let students = await Admissions.find();
                return res.send(students)


        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
);

app.get("/api/get_student/:id",  async (req, res) => {
    try {
        const stud = await Admissions.findById(req.params.id );
        // console.log(stud)
        res.json(stud);
    } catch (err) {
        return res.json({ status: "error-get" });
    }
});

app.post("/api/remove_student/:id",  async (req, res,auth,) => {
    try {
        const stud = await Admissions.findByIdAndRemove(req.params.id );
        return res.json({ status: "okay" });
    } catch (err) {
        return res.json({ status: "error" });
    }
});

app.listen(PORT, () => {
    console.log("Server is running");
});
