import * as fs from 'fs';

let regions = JSON.parse(fs.readFileSync("world.json", "utf8")).regions;

for (let region of regions){
    let sum = 0;
    let largestCity = "";
    let largestCityPop = 0;
    let mostPowerfulChar = "";
    let mostPowerfulItem = "";
    let mostPowerfulItemValue = 0;
    let mostPowerfulItemUse = "";
    for(let town of region.towns){
        sum += town.population;
        if(town.population > largestCityPop){
                    largestCityPop = town.population;
                    largestCity = town.name;
                }
        for(let person of town.notable_people){
            for(let item of person.items){
                if(item.power_level_out_of_ten > mostPowerfulItemValue){
                    mostPowerfulChar = person.name;
                    mostPowerfulItem = item.name;
                    mostPowerfulItemUse = item.use;
                    mostPowerfulItemValue = item.power_level_out_of_ten;
                }
            }
        }
    }
    console.log(`\n${region.name} Summary:
Average population of ${region.name}: ${Math.round(sum/(region.towns.length))}
Total population of ${region.name}: ${sum}
Largest city of ${region.name}: ${largestCity} with a population of ${largestCityPop}
Most powerful item: ${mostPowerfulItem} used as ${mostPowerfulItemUse}
Most powerful character by item value: ${mostPowerfulChar}\n`)
}

