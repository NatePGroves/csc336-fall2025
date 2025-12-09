import { useRef } from "react";
import emailjs from "@emailjs/browser";


export default function Contact() {
    const formRef = useRef();

    function sendEmail(e) {
        e.preventDefault();
        console.log("G9JwGdlyMocURr3GK")

        emailjs
            .sendForm(
                "service_sfj0tma",   // your service ID
                "template_tpka3cx",      // your template ID
                formRef.current,
                {
                    publicKey: "G9JwGdlyMocURr3GK",
                }
            )
            .then(
                () => {
                    console.log("SUCCESS!");
                    alert("Message sent!");
                    formRef.current.reset();
                },
                (error) => {
                    console.log("FAILED...", error);
                    alert("Error sending message.");
                }
            );
    }

    return (
        <div id="contact-body">
            <section id="contact">
                <h1>Fill out this form to send me an email! Thanks for reaching out!</h1>
                <form id="contact-form" ref={formRef} onSubmit={sendEmail}>

                    <input type="hidden" name="time" value={new Date().toString()} />

                    <label>Name</label>
                    <input type="text" name="name" required />

                    <label>Email</label>
                    <input type="email" name="email" required />

                    <label>Subject</label>
                    <input type="text" name="title" required />

                    <label>Message</label>
                    <textarea name="message" required></textarea>

                    <input type="submit" value="Send" />
                </form>
                <div className="no-gap">
                    <h1>And if forms aren't your style:</h1>
                    <h3>(click an icon to contact me that way)</h3>
                </div>
                <div className="contact-images">
                    <a href="https://www.linkedin.com/in/natepgroves/" target="_blank"><img src="../images/LI-Logo.png" className="contact-img"></img></a>
                    <a href="mailto:natepgroves@gmail.com" target="_blank"><img src="../images/email-img.png" className="contact-img"></img></a>
                </div>
            </section>
        </div>
    );
}