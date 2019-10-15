using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_HomePowerComsumption.Models
{
    public class Floor
    {
         public Floor() {
            List<Appliance> Appliances = new List<Appliance>();
        }
        public int? id {get;set;}
        public string floorName { get; set; }
        public List<Appliance> Appliances { get; set; }
    }
}
