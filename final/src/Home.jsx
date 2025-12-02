import { Link } from "react-router-dom";
import "./index.css";

export default function Home(){
    return(
        <div className="page-body">
            <div id = "lookie-here">
                <h2 id = "made-a-site"><a href = "#introduction">Look! I made a website!</a></h2>
            </div>
            <section id = "introduction">
                <br/>
                <h1>Hi! I'm Nate! I'm the guy in the picture.</h1>
                <p>This is my website! If you only have a little time, I'd recommend checking out my resume on the nicely named <Link to="/Resume" style={{ color: "blue", textDecoration: "underline" }}>resume page.</Link></p>
                <p> But if you have a little more time, stick around and check out some of my <Link to="/Projects" style={{ color: "blue", textDecoration: "underline" }}>projects</Link> or what I'm <Link to="/Projects" style={{ color: "blue", textDecoration: "underline" }}>about</Link> and working on!</p>
                <p>If you decide to reach out, that sounds great! You can get in contact on the also very well named contact page!</p>
                <br/>
                <p/>Thanks for checking out my site!<p/>
            </section>
        </div>
    )
}