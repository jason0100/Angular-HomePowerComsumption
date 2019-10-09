import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../forbidden-name.directive';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent implements OnInit {
    name = new FormControl('');
    submitted = false;
    profileForm: any;
    //profileForm = new FormGroup({
    //    firstName: new FormControl(),
    //    lastName: new FormControl(),
    //    address: new FormGroup({
    //        street: new FormControl(),
    //        city: new FormControl(),
    //        state: new FormControl(),
    //        zip:new FormControl()
    //    }),
    //});
   

    constructor(private fb: FormBuilder) {

        this.profileForm = this.fb.group({
            firstName: ['', [Validators.required,
                Validators.minLength(4),
            forbiddenNameValidator(/bob/i)]

            ],
            lastName: [''],
            address: this.fb.group({
                street: [''],
                city: [''],
                state: [''],
                zip: ['']
            }),
            aliases: this.fb.array([
                this.fb.control('')
            ])
        });
    }

  ngOnInit() {
  }

    updateName() {
        this.name.setValue('Nancy');
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.profileForm.value);
    }
    updateProfile() {
        this.profileForm.patchValue({
            firstName: 'Nancy',
            address: {
                street: '123 Drew Street'
            }
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.profileForm.controls; }

    get aliases() {
        return this.profileForm.get('aliases') as FormArray;
    }
    get firstName() { return this.profileForm.get('firstName'); }
    addAlias() {
        this.aliases.push(this.fb.control(''));
    }

    onReset() {
        this.submitted = false;
        this.profileForm.reset();
    }
}
