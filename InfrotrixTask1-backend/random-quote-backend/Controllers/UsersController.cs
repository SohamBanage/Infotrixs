using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using random_quote_backend.Models;

namespace random_quote_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly UserContext _userContext;
        public UsersController(UserContext userContext) 
        {
            _userContext = userContext;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            if(_userContext.Users == null)
            {
                return NotFound();
            }
            return await _userContext.Users.ToListAsync();
        }
        //not Applied
        [HttpGet("{id}")]
        public async Task<ActionResult<User>>GetUser(int id)
        {
            if(_userContext.Users==null)
            {
                return NotFound();
            }
            var user=await _userContext.Users.FindAsync(id);
            if(user==null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<User>>PostUser(User user)
        {
            _userContext.Users.Add(user);
            await _userContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new {id= user.Id},user);
        }
        //not Applied
        [HttpPut("{id}")]
        public async Task<ActionResult>PutUser(int  id, User user)
        {
            if(id!=user.Id)
            {
                return BadRequest();
            }
            _userContext.Entry(user).State = EntityState.Modified;
            try
            {
                await _userContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteUser(int id)
        {
            if(_userContext.Users == null)
            {
                return NotFound();
            }
            var user = await _userContext.Users.FindAsync(id);
            if(user==null)
            {
                return NotFound();
            }
            _userContext.Users.Remove(user);
            await _userContext.SaveChangesAsync();
            return Ok();
        }
    }
}
