const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', function (req, res) {
    res.status(200).send('success');
});

router.post('/email/send', (req, res) => {      
    let toList = ''      
    let subject ='Match - ' + req.body.matchnumber + ' (' + req.body.leftCountry + ' vs ' + req.body.rightCountry + ') predictions';
    let matchHtml = '<h2 style="color: green">Score predictions for Match - ' + req.body.matchnumber + ' (' + req.body.leftCountry + ' vs ' + req.body.rightCountry + ') is over. Below are the locked predictions :</h2>' + `
        <table style="border: 1px solid grey; padding: 10px">
            <th style="width: 100px">
            PlayerName
            </th>
            <th style="width: 100px">
            `+req.body.leftCountry+`
            </th>
            <th style="width: 100px">
            `+req.body.rightCountry+`
            </th>
            <th style="width: 100px">
            Favourite
            </th>`;
        for (let i = 0; i < req.body.predictions.length; i++){   
            toList += req.body.predictions[i].UserEmail + ','                      
            matchHtml += `<tr style="border: 1px solid grey; padding: 20px">
                <td style="border: 1px solid grey; text-align: center">
                    `+req.body.predictions[i].UserName+`
                </td>
                <td style="border: 1px solid grey; text-align: center">
                    `+req.body.predictions[i].LeftCountryPredictedScore+`
                </td>
                <td style="border: 1px solid grey; text-align: center">
                    `+req.body.predictions[i].RightCountryPredictedScore+`
                </td>
                <td style="border: 1px solid grey; text-align: center">
                    `+req.body.predictions[i].IsBetting+`
                </td>
                </tr>`;
            
        }
        matchHtml += '</table>'
        toList = toList.substring(0, toList.length - 1);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                    user: 'mohitmaharjan7@gmail.com',
                    pass: 'dgzkvudwfccsoeqc',
                },
            secure: true,
        });  
        const mailData = {
            from: 'mohitmaharjan7@gmail.com',  // sender address
                to:  toList,
                subject: subject,                  
                html: matchHtml,
        };                               
        transporter.sendMail(mailData, function(error, info){
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(200).send('Email sent: ' + info.response)
        }
    });	
})
router.get('/sendemail/:leftCountry/:rightCountry/:matchnumber/:matchid/:userid', (req, res, next) => {
	
})
module.exports = router;