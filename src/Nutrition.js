function Nutrition () {
const NutritionShow = ({label,quantity,unit}) => {


    return(
        
  <div className="App">
            <table>
                <tr>
                    <th>label</th>
                    <th>quantity</th>
                    <th>unit</th>
                </tr>
                {NutritionShow.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.label}</td>
                            <td>{val.quantity}</td>
                            <td>{val.unit}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
        
    )
}
}
export default Nutrition;
