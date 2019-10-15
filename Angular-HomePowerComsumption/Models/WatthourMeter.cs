using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_HomePowerComsumption.Models
{
    public class WatthourMeter
    {
        public int? id { get; set; }
        public string wattHourMeterName { get; set; }
        public int kwh{get;set;}
        public List<Appliance> Appliances { get; set; }
    }
}
