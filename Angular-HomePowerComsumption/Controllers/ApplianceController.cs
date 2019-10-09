using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular_HomePowerComsumption.Data;
using Angular_HomePowerComsumption.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Angular_HomePowerComsumption.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplianceController : ControllerBase
    {
        private readonly PowerDbContext _context;
        public ApplianceController(PowerDbContext context) {
            _context = context;
        }
        public IEnumerable<object> Get() {
            var query = from app in _context.Appliances
                        select new { app.id, app.name, app.watt, app.kwh, app.spec, app.voltage, 
                            app.useHrPerMonth, app.Floor.floorName,app.WatthourMeter.wattHourMeterName };

            return query.ToArray();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> Get(int id)
        {
            var query = await _context.Appliances.FindAsync(id);

            if (query == null)
            {
                return NotFound();
            }


            return query;
        }

        [HttpPost]
        public async Task<ResultModel> Post([FromBody]Appliance a)
        {
            var result = new ResultModel();
            var query = from Appliance in _context.Appliances
                        where Appliance.name == a.name
                        select Appliance;
            if (query.FirstOrDefault() != null)
            {
                result.IsSuccess = false;
                result.Message = "Dublicated Appliance Name.";
                return result;
            }
          
            await _context.Appliances.AddAsync(a);
            await _context.SaveChangesAsync();
            result.Data = a.id;
            result.IsSuccess = true;
            return result;


        }
        [HttpPut("{id}")]
        public async Task<ResultModel> Put([FromBody]Appliance a) {
            var result = new ResultModel();
            var query = _context.Appliances.Find(a.id);
            if (query == null) {
                result.IsSuccess = false;
                result.Message = "Not Found.";
                return result;
            }
           


            try
            {
                _context.Entry(query).CurrentValues.SetValues(a);
                await _context.SaveChangesAsync();
                result.IsSuccess = true;
                result.Message = "Edit data Success.";
            }
            catch (DbUpdateConcurrencyException) {
                result.IsSuccess = false;
                result.Message = "Db Error";
            }
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResultModel>> Delete(int id)
        {
            var result = new ResultModel();
            var query = await _context.Appliances.FindAsync(id);
            if (query == null)
            {
                result.IsSuccess = false;
                result.Message = "Not Found.";

                //return NotFound();
            }
            else
            {
                _context.Appliances.Remove(query);
                await _context.SaveChangesAsync();
                result.IsSuccess = true;
                result.Message = "Delete success.";

            }

            return result;
        }
    }

}