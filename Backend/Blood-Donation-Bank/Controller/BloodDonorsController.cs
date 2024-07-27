using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blood_Donation_Bank.Data;
using Blood_Donation_Bank.model;
using Microsoft.AspNetCore.CookiePolicy;

namespace Blood_Donation_Bank.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodDonorsController : ControllerBase
    {
        private readonly DBContextDonor _context;

        public BloodDonorsController(DBContextDonor context)
        {
            _context = context;
        }

        // GET: api/BloodDonors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BloodDonor>>> GetDonors(
        [FromQuery] string bloodGroup,
        [FromQuery] string country,
        [FromQuery] string state,
        [FromQuery] string city)
        {
            var query = _context.BloodDonors.AsQueryable();

            // Apply the filtering conditions directly
            query = query.Where(d =>
                (d.BloodGroup == bloodGroup) &&
                (d.Country == country) &&
                (d.State == state) &&
                (d.City == city)
            );

            var donors = await query.ToListAsync();

            return Ok(donors);
        }

        // PUT: api/BloodDonors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBloodDonor(int id, BloodDonor bloodDonor)
        {
            if (id != bloodDonor.Id)
            {
                return BadRequest();
            }

            _context.Entry(bloodDonor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BloodDonorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BloodDonors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BloodDonor>> PostBloodDonor(BloodDonor bloodDonor)
        {
            try
            {
                _context.BloodDonors.Add(bloodDonor);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBloodDonor", new { id = bloodDonor.Id }, bloodDonor);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.InnerException.Message);
                Console.WriteLine(e.Message);
                return BadRequest();
            }
        }

        // DELETE: api/BloodDonors/5
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteBloodDonor(int id)
        {
            var bloodDonor = await _context.BloodDonors.FindAsync(id);
            if (bloodDonor == null)
            {
                return NotFound();
            }

            _context.BloodDonors.Remove(bloodDonor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BloodDonorExists(int id)
        {
            return _context.BloodDonors.Any(e => e.Id == id);
        }
    }
}
