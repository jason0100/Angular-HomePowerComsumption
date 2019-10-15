using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Angular_HomePowerComsumption.Data;
using Angular_HomePowerComsumption.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular_HomePowerComsumption.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : ControllerBase
    {

        private readonly PowerDbContext _context;
        public FloorController(PowerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IQueryable Get()
        {
            var query = from floor in _context.Floors
                        select new {floor.id,
                        floor.floorName,
                        floor.Appliances};

            return query;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Floor>> Get(int id)
        {
            var query = await _context.Floors.FindAsync(id);
            if (query == null)
            {
                return NotFound();
            }

            return query;
        }

        [HttpPost]
        public async Task<ResultModel> Post([FromBody]Floor f)
        {
            var result = new ResultModel();
            var query = from floor in _context.Floors
                        where floor.floorName == f.floorName
                        select floor;
            if (query.Count() != 0)
            {
                result.IsSuccess = false;
                result.Message = "Dublicated Floor.";
                return result;
            }


            await _context.Floors.AddAsync(f);
            await _context.SaveChangesAsync();
            result.Data = f.id;
            result.IsSuccess = true;
            return result;


        }

        [HttpPut("{id}")]
        public async Task<ResultModel> Put([FromBody]Floor f)
        {
            var result = new ResultModel();
            var query = _context.Floors.Find(f.id);
            if (query == null)
            {
                result.IsSuccess = false;
                result.Message = "Not Found.";
                return result;
            }



            try
            {
                _context.Entry(query).CurrentValues.SetValues(f);
                await _context.SaveChangesAsync();
                result.IsSuccess = true;
                result.Message = "Edit data Success.";
            }
            catch (DbUpdateConcurrencyException)
            {
                result.IsSuccess = false;
                result.Message = "Db Error";
            }
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResultModel>> Delete(int id)
        {
            var result = new ResultModel();
            var query = await _context.Floors.FindAsync(id);
            if (query == null)
            {
                result.IsSuccess = false;
                result.Message = "Not Found.";

                //return NotFound();
            }
            else
            {
                _context.Floors.Remove(query);
                await _context.SaveChangesAsync();
                result.IsSuccess = true;
                result.Message = "Delete success.";

            }

            return result;
        }

    }
}