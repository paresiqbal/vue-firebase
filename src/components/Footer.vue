<script setup>
// Icon
import {
  PhoneIcon,
  EnvelopeIcon,
  InboxIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="pt-10">
    <footer
      class="footer p-10 bg-emerald-500 text-white text-base font-semibold px-36 flex justify-between items-center"
    >
      <div class="max-w-sm">
        <span class="flex items-center text-2xl font-bold"
          ><img src="../assets/upp.png" alt="logo" class="w-20" />Universitas
          Pat Petulai</span
        >
        <a class=""
          >Alamat Jl. Basuki Rahmat No.13, Dwi Tunggal, Kec. Curup, Kabupaten
          Rejang Lebong, Bengkulu 39119</a
        >
        <div class="pt-8 flex flex-col gap-4">
          <span class="flex gap-2 items-center"
            ><PhoneIcon class="w-6" />(0274) 884201 - 207</span
          >
          <span class="flex gap-2 items-center"
            ><EnvelopeIcon class="w-6" />upp@gmail.com</span
          >
          <span class="flex gap-2 items-center"
            ><InboxIcon class="w-6" />6969</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-bold">AKADEMIK</span>
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />PMB (Pendaftaran)</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Info Akademik</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Info Keuangan</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Info Kemahasiswaan</span
        >
      </div>
      <div class="flex flex-col gap-2">
        <span class="font-bold">DEPARTMENT</span>
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Direktorat Administrasi Akademik
          (DAAK)</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Direktorat Perencanaan dan Keuangan
          (DPK)</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Direktorat Kemahasiswaan</span
        >
        <span class="flex gap-2"
          ><ChevronRightIcon class="w-6" />Direktorat Innovation Center
          (IC)</span
        >
      </div>
    </footer>
    <footer class="footer px-20 py-4 bg-emerald-600 text-white border-base-300">
      <div class="items-center grid-flow-col">
        <img src="../assets/upp.png" alt="logo" class="w-12" />
        <p>Universitas Pat Petulai <br />Providing reliable tech since 1992</p>
      </div>
      <div class="md:place-self-center md:justify-self-end">
        <div class="grid grid-flow-col gap-4">
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              ></path></svg
          ></a>
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              ></path></svg
          ></a>
          <a
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current"
            >
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              ></path></svg
          ></a>
        </div>
      </div>
    </footer>
  </div>
</template>
