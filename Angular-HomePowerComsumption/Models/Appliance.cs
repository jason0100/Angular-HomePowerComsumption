using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_HomePowerComsumption.Models
{
    public class Appliance
    {
        public int? id { get; set; }
        [Display(Name = "名字")]
        public string name { get; set; }
        public string spec { get; set; }
        public int? watt { get; set; }
        [Display(Name = "使用度數/月(和使用小時/月 擇一輸入)")]
        public int? kwh { get; set; }
        public int? voltage { get; set; }
        [Display(Name = "使用小時/月(和使用度數/月 擇一輸入)")]
        public float? useHrPerMonth { get; set; }
        [Display(Name="Description")]
        public string description { get; set; }

        public int WatthourMeterId { get; set; }
        public WatthourMeter WatthourMeter { get; set; }

        public int FloorId { get; set; }
        public Floor Floor { get; set; }

    }
}
