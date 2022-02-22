import faker from "@faker-js/faker";
import { TextField } from "@mui/material";
const Faker = () => {
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="first name"
        placeholder={faker.name.firstName()}
        variant="standard"
      />
      <br></br>
      <TextField
        autoFocus
        margin="dense"
        label="last name"
        placeholder={faker.name.lastName()}
        variant="standard"
      />
      <br></br>
      <TextField
        autoFocus
        label="City Name"
        margin="dense"
        placeholder={faker.address.cityName()}
        variant="standard"
      />

      <TextField
        autoFocus
        label="Street "
        margin="dense"
        placeholder={faker.address.streetAddress()}
        variant="standard"
      />
      <br></br>
      <TextField
        autoFocus
        label="Job Title"
        margin="dense"
        placeholder={faker.name.jobTitle()}
        variant="standard"
      />
    </>
  );
};

export default Faker;
