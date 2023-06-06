import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React ,{useState,useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import easyinvoice from "easyinvoice";
import axios from "axios";

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];

  const referenceNum = seachQuery.get("reference");

  const [paymentDetails, setPaymentDetails] = useState("");

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       const response = await fetch("http://localhost:4000/api/paymentdetails/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ razorpay_payment_id:"sdfghjtrawertdf7891" }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPaymentDetails(data);
//       } else {
//         console.error("Error fetching payment details");
//       }
    // };

//     fetchPaymentDetails();
//   }, []);
//   console.log(paymentDetails.customer)
const fetchPaymentDetails = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/paymentdetails/", {
        razorpay_payment_id: "sdfghjtrawertdf7891",
      });

      if (response.status === 200) {
        setPaymentDetails(response.data);
        downloadInvoice()
      } else {
        console.error("Error fetching payment details");
      }
    } catch (error) {
      console.error("Error fetching payment details", error);
    }
  };

function downloadInvoice(){
  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      // The invoice background
      background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
    },
    // Your own data
    sender: {
      company: "VM Sound Systems",
      address: "VIIT Pune",
      zip: "123455",
      city: "Pune",
      country: "India",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      Name: paymentDetails.customer.name,
      address: "Clientstreet 456",
      zip: "4567 CD",
      city: "Clientcity",
      country: "Clientcountry",
      phone: paymentDetails.customer.phone
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: "2021.0001",
      // Invoice data
      date: "12-12-2021",
      // Invoice due date
      "due-date": "31-12-2021",
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products:paymentDetails.payment.products,
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    settings: {
      currency: "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal", // Defaults to 'Total'
      // "vat": "btw" // Defaults to 'vat'
    },
  };
// const data={}
//   Create your invoice! Easy!
  easyinvoice.createInvoice(data, function (result) {
    easyinvoice.download("myInvoice.pdf", result.pdf);
    //	you can download like this as well:
    //	easyinvoice.download();
    //	easyinvoice.download('myInvoice.pdf');
  });
}
const handleButtonClick = () => {
    fetchPaymentDetails();
  };

  return (
    <Box>
      <VStack h="100vh" justifyContent={"center"}>
        <Heading textTransform={"uppercase"}> Order Successfull</Heading>
        <Button onClick={handleButtonClick}>download</Button>
        <Text>Reference No.{referenceNum}</Text>
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
