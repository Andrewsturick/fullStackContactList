'use strict;'

var thisRow;

$(document).ready(init);

function init(){
  $('#submit').on('click', addRow);
  $('.table').on('click', '.delete', deleteRow)
  $('.table').on('click', '.edit', editRow)
  $('.table').on('click', '.edit.editing-row-currently', editRowDisappear)
  $('form').on('click', '#editSubmit', submitEdit)
  $('body').on('click', '.editing-row-currently.delete', hideEdit)
}

///////////////////////////////////////marker/////////////////////////
function hideEdit(){
  $('.editing').toggleClass('hidden');
}


function editRowDisappear(e){
  $('.editing').toggleClass('hidden');
  $(e.target).closest('tr').children('td').toggleClass('editing-row-currently')
}


function deleteRow(e){
  var thisRow = (e.target).closest('tr').rowIndex;
  $.ajax({
      method: 'DELETE',
      url: '/',
      data: {'row': thisRow},
      success: function(data,status){
          $(e.target).closest('tr').remove();
      }
    });
};

function submitEdit(event){
  var editContact = {};
  editContact.name = $('input#editName').val();
  editContact.email = $('input#editEmail').val();
  editContact.phone = $('input#editPhone').val();
  editContact.address = $('input#editAddress').val();

  $('.editing').toggleClass('hidden');

  $('input#editName').val('');
  $('input#editEmail').val('');
  $('input#editPhone').val('');
  $('input#editAddress').val('');

  var editingRowIndex = $('.editing-row-currently').closest('tr').index()+1;


  event.preventDefault();
  $.ajax({
    method: 'PUT',
    url: '/',
    data: {'row': editingRowIndex, 'contact': editContact},
    success: function(data,status){
      console.log(data);
      var $name = $('<td>').text(editContact.name);
      var $email = $('<td>').text(editContact.email);
      var $phone = $('<td>').text(editContact.phone);
      var $address = $('<td>').text(editContact.address);
      var $edit = $('<td>').addClass('edit');
      var $del = $('<td>').addClass('delete');
      var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
      var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg delete');
      $edit.append($editIcon);
      $del.append($deleteIcon);
      var $newTr = $('<tr>');
      $newTr.append($name, $email, $phone, $address, $edit, $del);
      $('.editing-row-currently').closest('tr').replaceWith($newTr);
    }
  })

}

function editRow(e){
  if ($('.hidden').length){
  $('.editing').toggleClass('hidden');
  var thisRow = (e.target).closest('tr').rowIndex;

   $(e.target).closest('tr').children('td').toggleClass('editing-row-currently')

  }
};


function addRow(){
  var newContact = {};
  newContact.name = $('input#name').val();
  newContact.email = $('input#email').val();
  newContact.phone = $('input#phone').val();
  newContact.address = $('input#address').val();

  $('input#name').val('');
  $('input#email').val('');
  $('input#phone').val('');
  $('input#address').val('');


  $.ajax({
      method: 'POST',
      url: '/',
      data: {'contact': newContact},
      success: function(data,status){
        var $tr = $('<tr>');
        var $name = $('<td>').addClass('name').text(newContact.name);
        var $email = $('<td>').addClass('email').text(newContact.email);
        var $phone = $('<td>').addClass('phone').text(newContact.phone);
        var $address = $('<td>').addClass('address').text(newContact.address);
        var $edit = $('<td>').addClass('edit');
        var $del = $('<td>').addClass('delete');
        var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
        var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg delete');
        $edit.append($editIcon);
        $del.append($deleteIcon);
        $tr.append($name, $email, $phone, $address, $edit, $del);
        $('tbody').append($tr);
      }
    })
}   
