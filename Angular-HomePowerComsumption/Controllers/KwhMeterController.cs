using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular_HomePowerComsumption.Data;
using Angular_HomePowerComsumption.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Angular_HomePowerComsumption.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KwhMeterController : ControllerBase
    {
        private readonly PowerDbContext _context;
        public KwhMeterController(PowerDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<WatthourMeter> Get()
        {
            var query = from meter in _context.WatthourMeters
                        select meter;

            return query.ToArray();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<WatthourMeter>> Get(int id)
        {
            var query = await _context.WatthourMeters.FindAsync(id);
            if (query == null) {
                return NotFound();
            }

            return query;
        }

        [HttpPost]
        public async Task<ResultModel> Post([FromBody]WatthourMeter w)
        {
            var result = new ResultModel();
            var query = from meter in _context.WatthourMeters
                        where meter.wattHourMeterName == w.wattHourMeterName
                        select meter;
            if (query.FirstOrDefault() != null) {
                result.IsSuccess = false;
                result.Message = "Dublicated Meter.";
                return result;
            }


            await _context.WatthourMeters.AddAsync(w);
            await _context.SaveChangesAsync();
            result.Data = w.id;
            result.IsSuccess = true;
            return result;

            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResultModel>> Delete(int id)
        {
            var result = new ResultModel();
            var query = await _context.WatthourMeters.FindAsync(id);
            if (query == null)
            {
                result.IsSuccess = false;
                result.Message = "Not Found.";
                
                //return NotFound();
            }
            else {
                _context.WatthourMeters.Remove(query);
                await _context.SaveChangesAsync();
                result.IsSuccess = true;
                result.Message = "Delete success.";

            }

            return result;
        }
    }
}