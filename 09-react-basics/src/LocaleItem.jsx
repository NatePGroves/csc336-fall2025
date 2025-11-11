// Import CSS file for styling this component
import "./LocaleItem.css"

function LocaleItem({locale}) {
 
  return (
    <li 
        style={
            {
                textDecoration: locale.seen ? "line-through" : "none",
                backgroundColor: locale.usa ? "blue": "white",
                color: locale.usa ? "red": "black"
            }
        }>
        {locale.locale}
    </li>
  )
}

export default LocaleItem