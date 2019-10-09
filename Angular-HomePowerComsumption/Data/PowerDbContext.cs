using Angular_HomePowerComsumption.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_HomePowerComsumption.Data
{
    public class PowerDbContext:DbContext
    {
        public PowerDbContext(DbContextOptions<PowerDbContext> options)
          : base(options) { }

        public DbSet<Floor> Floors { get; set; }
        public DbSet<WatthourMeter> WatthourMeters { get; set; }
        public DbSet<Appliance> Appliances { get; set; }
    }
}
